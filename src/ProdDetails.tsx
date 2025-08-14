import { useEffect, useRef,useState } from 'react';
import logo from './logo.svg';
import arrrowup from './arrow_up.png';
import designer from './Designer.jpeg';
import product from './Product';

    type Props = {
  chosenprd: product,
  aNewProd:(prd: product) => boolean,
  updateExistingProduct:(num:number,str:string,str1:string,num2:number) => boolean,
  highest_id: number

}
const ProdDetails = ({chosenprd, aNewProd,updateExistingProduct, highest_id} : Props)=> {
    const [savedmsgg,setSaved] = useState(false);
    const textname = useRef<HTMLTextAreaElement>(null);
    const textdesc = useRef<HTMLTextAreaElement>(null);
    const priceinput = useRef<HTMLInputElement>(null);
     const dateinput = useRef<HTMLInputElement>(null);
    useEffect(()=>{
        if(!textname.current || !textdesc.current || !priceinput.current || !dateinput.current) return;
        textname.current.value = chosenprd.Name;
        textdesc.current.value = chosenprd.Description;
        priceinput.current.value = chosenprd.Price+'';
        if(chosenprd.ID !== 0)
            dateinput.current.value = '1981-12-11';
        
        return () => {

        }
    },[chosenprd]);
    const validateAndSave = () => {
        if(!textname.current || !textdesc.current || !priceinput.current || !dateinput.current) return;
        if(textname.current.value.length > 0 && textname.current.value.length < 30 && textdesc.current.value.length < 200 && parseInt(priceinput.current.value) > 0 && dateinput.current.value !== ''){
              
            if(chosenprd.ID === 0){
                //for new product 
                let prod1 = new product();
                prod1.ID = 0;
                prod1.Name = textname.current.value;
                prod1.Description = textdesc.current.value;
                prod1.Price = parseFloat(priceinput.current.value);
                if(dateinput.current !== null && chosenprd.ID === 0)
                    prod1.Creation = new Date(dateinput.current.value);
                aNewProd(prod1);
                setSaved(true);
            } else {
                //for update
                updateExistingProduct(chosenprd.ID,textname.current.value,textdesc.current.value,parseFloat(priceinput.current.value));
                setSaved(true);
            }
        } else {
            let msgtxt = "";
            if(!(textname.current.value.length > 0 && textname.current.value.length < 30))
                msgtxt = "a name must not be empty nor longer than 30 charachters";
            if(!(textdesc.current.value.length < 200))
                msgtxt = "A description has to be shorter than 200 characters";
            if(parseInt(priceinput.current.value) <= 0)
                msgtxt = "a price cannot be 0 or less";
            if(dateinput.current.value === '')
                msgtxt = "A date cannot be empty";
            alert('inputted details are not valid: ' + msgtxt);
        }
    }
    return (<div><div className="dets-wrapper">
        <div className="details-headline">{chosenprd.Name} details</div>
        {(chosenprd.ID !== 0 && chosenprd.ID % 3 === 0) && <><img src={logo} className="product-image" alt="" /><br /></>}
        {(chosenprd.ID !== 0 && chosenprd.ID % 3 === 1) && <><img src={arrrowup} className="product-image" alt="" /><br /></>}
        {(chosenprd.ID !== 0 && chosenprd.ID % 3 === 2) && <><img src={designer} className="product-image" alt="" /><br /></>}
        
        {(chosenprd.ID === 0 && highest_id % 3 === 0) && <><img src={logo} className="product-image" alt="" /><br /></>}
        {(chosenprd.ID === 0 && highest_id % 3 === 1) && <><img src={arrrowup} className="product-image" alt="" /><br /></>}
        {(chosenprd.ID === 0 && highest_id % 3 === 2) && <><img src={designer} className="product-image" alt="" /><br /></>}
        <span>Name</span><br />
        <textarea ref={textname}>{chosenprd.Name}</textarea><br />
        <span>Description</span><br />
        <textarea ref={textdesc}>{chosenprd.Description}</textarea><br />
        <span>Price</span><br />
        <input ref={priceinput} type="number" ></input>
        {chosenprd.ID === 0 && <input ref={dateinput} type="date" />}
        {chosenprd.ID !== 0 && <input style={{visibility:'hidden'}} ref={dateinput} type="date" />}
        {savedmsgg && <div className="saved-message">saved</div>}
        <button onClick={validateAndSave}>Save</button>
        </div>
    </div>);
}
export default ProdDetails;