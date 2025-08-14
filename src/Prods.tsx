import {useRef,useState,useEffect,useMemo} from 'react';
import Header from './header';
import Footer from './Footer';
import product from './Product';
import ProdBar from './ProdBar';
import ProdDetails from './ProdDetails';
import { useParams } from "react-router";
const Prods = () =>{
    const [products, setProducts] = useState<product[] | []>([]);
    const [prdmodal,setModal] = useState(false);
    const [shownProduct,setShown] = useState<product | null>(null);
    const [filtertxt,setFilter] = useState('');
    const [sortmethod,setSortMethod] = useState(1);
    const [number_of_pages,setNumPages] = useState(0);
    const [cur_page,setCurPage] = useState(1);
    const [lookatStorage,setLook] = useState(false);
    const firstcall = useRef(false);
    let params = useParams();
    useEffect(()=>{
        let prodarr = [];
        // let prod1 = new product();
        if(localStorage.getItem('products')){
            if(localStorage.getItem('products') === null) return;
            const rawproducts = localStorage.getItem('products');
            if(rawproducts !== null){
                let rawprods = JSON.parse(rawproducts);
                for(const key in rawprods){ 
                    const new_creation = new Date(rawprods[key].Creation); 
                    const price = parseFloat(rawprods[key].Price);
                    const cur_id = parseFloat(rawprods[key].ID);
                    prodarr.push(createProduct(cur_id,rawprods[key].Name,rawprods[key].Description,price,new_creation));
                }
            }
        } else {
            //seeding in case localStorage has no products item
            prodarr.push(createProduct(1,"prod","does something",5,new Date()));
            prodarr.push(createProduct(2,"prod1","does something else",6,new Date()));
            prodarr.push(createProduct(3,"prod2","does something different",8,new Date()));
            prodarr.push(createProduct(4,"prod3","does something very different",7,new Date()));
            prodarr.push(createProduct(5,"Aba","desc",7,new Date('Thu Aug 07 2025 03:00:00 GMT+0300 (Israel Daylight Time)')));
            prodarr.push(createProduct(6,"React","",11,new Date('Sat Aug 30 2025 03:00:00 GMT+0300 (Israel Daylight Time)')));
            prodarr.push(createProduct(7,"Angular","",24,new Date('Sat Sep 21 2025 03:00:00 GMT+0300 (Israel Daylight Time)')));
            prodarr.push(createProduct(8,"Vue","I don't like the view from Vue",24,new Date('Sat Jul 21 2025 03:00:00 GMT+0300 (Israel Daylight Time)')));
            prodarr.push(createProduct(9,"TypeScript","typescript is a torture machine for programmers",1,new Date('Sat Jul 13 2025 03:00:00 GMT+0300 (Israel Daylight Time)')));
            prodarr.push(createProduct(10,"TypeScript Forte","typescript forte is a framework that insults you when you make a mistake",23,new Date('Sat Jul 13 2025 03:00:00 GMT+0300 (Israel Daylight Time)')));
            prodarr.push(createProduct(11,"ShekerKolshehoo.js","ShekerKolshehoo is the next framework all programmers must use",347,new Date('Sat Jul 13 2024 03:00:00 GMT+0300 (Israel Daylight Time)')));
        }
        setProducts(prodarr);
        return () => {}
    },[]);
    useEffect(()=>{
        //update number of pages according to changing number of objects
        let num = (products.length % 5) === 0 ? (products.length / 5) : (parseInt((products.length / 5)+'')+1);
        setNumPages(a=>a=num);
        //save products on localStorage
        if(lookatStorage === true){
            localStorage.setItem('products',JSON.stringify(products));
        }
        setLook(true);
        if(params.id && firstcall.current === false && products.length > 0 ){
            firstcall.current = true;
            let iterprds = 0;
            for(iterprds = 0;iterprds < products.length;iterprds++){
                if(products[iterprds].ID === parseInt(params.id)){
                    openModal(products[iterprds]);
                }
            }
        }
        console.log(products);
        setNumberOfPages(filtertxt);
        return ()=>{}
    },[products]);
    useEffect(()=>{
        if(cur_page > number_of_pages)
            setCurPage(pre=>pre=1);
    },[filtertxt]);
        //two sort methods to choose from 
    const sortMethods = [
        { method: (a: product, b: product) => a.Creation > b.Creation ? 1 : -1 },
        { method: (a: product, b: product) => a.Name.toLowerCase() > b.Name.toLowerCase() ? 1 : -1 }
    ];
    const openModal = (prd:product)=> {
        setModal(true);
        setShown(a => a = prd);
        console.log(shownProduct);
        return true;
    }
    const deleteProd = (prodct: product)=>{
        setProducts((prevItems) => prevItems.filter(item => item !== prodct));
        return true;
    }
    //since the product list can be long I memoized it
    const ProductListMemoize = useMemo(()=>{
            return (products.filter((item) =>((item.Name.includes(filtertxt) || item.Description.includes(filtertxt)))).sort(sortMethods[sortmethod].method).filter((item,index) => (index >= ((cur_page-1)*5) && index < (cur_page * 5))).map((item,index)=>(
        <ProdBar key={index} ind_show={index} prodct={item} changeDefModal={openModal} deleteProd={deleteProd} />
    )));
        },[products,filtertxt,sortmethod,cur_page]);
    const createProduct = (id:number,name:string, description: string,price:number,creation:Date)=>{
        let prod1 = new product();
        prod1.ID = id;
        prod1.Name = name;
        prod1.Description = description;
        prod1.Price = price;
        prod1.Creation = creation;
        return prod1;
    }
    
    //open modal for adding new product
    const setAddingProduct = ()=> {
        let new_empty_prod = createProduct(0,"","",0,new Date());
        // setEmpty(a => a = new_empty_prod);
        setModal(true);
        setShown(a=> a = new_empty_prod);
    }
    //find highest number so that ID of new product is unique
    //memoized because products are many and long
        const findHighestID = useMemo(()=>{
            let iteronprds = 0;
            let highestnum = 0;
            if(products.length === 0) return 1;
            for(iteronprds = 0;iteronprds< products.length;iteronprds++){
                if(iteronprds === 0){
                    highestnum = products[0].ID;
                } else {
                    if(highestnum !== undefined && highestnum < products[iteronprds].ID)
                        highestnum = products[iteronprds].ID;
                }
            }
            return (highestnum+1);
        },[products]);


    //add new product
    const addNewProduct = (prdc:product)=> {
        const new_id = findHighestID;
        const newprd = createProduct(new_id,prdc.Name, prdc.Description,prdc.Price,prdc.Creation)
        setProducts((prevItems) => [...prevItems,newprd]);
        setModal(false);
        return true;
    }
    //update product
    const updateProd = (num:number,str:string,str1:string,num2:number) => {
        const newProducts = products.map(prd1 => {
      if (prd1.ID !== num) {
        return prd1;
      } else {
        return {
          ...prd1,
          Name: str,
        Description: str1,
            Price: num2
        };
      }
    });
    // Re-render with the new array
    setProducts(newProducts);
    setModal(false);
    return true;
    }

    //after select box choice this function chooses the sorting method
    const setSortMethods = (mthd:string)=> {
        if(mthd === "Creation date")
            setSortMethod(0);
        if(mthd === "Product name")
            setSortMethod(1);
    }
    //paginate back
    const goBackPage = () => {
        if(cur_page <= 1) return;
        setCurPage((b) => b-1);
    }
    //paginate ahead
    const goForwardPage = () => {
        if(cur_page >= number_of_pages) return;
        setCurPage((b) => b+1);
    }
    const setNumberOfPages = (filtertxt1:string) => {
        let iter_filter = 0;
        let count_prods = 0;
        for( iter_filter = 0; iter_filter< products.length; iter_filter++){
            if(products[iter_filter].Name.includes(filtertxt1) || products[iter_filter].Description.includes(filtertxt1)){
                count_prods++;
            }
        }
        
        const cur_number = (count_prods % 5) === 0 ? (count_prods / 5) : (parseInt((count_prods / 5)+'')+1);
        console.log('cur_number: '+cur_number);
        setNumPages(poi=> poi = cur_number);
    }
    return (<><Header />
    
    
    <div className="prod-menu"><button onClick={setAddingProduct}>+ Add</button><input type="text" placeholder="search products" value={filtertxt} onChange={(event) => {setFilter(event.target.value); setNumberOfPages(event.target.value);}} /><div className="sort-by">Sort By</div> <select onChange={e => setSortMethods(e.target.value)} ><option value="Product name">Product name</option><option value="Creation date">Creation date</option></select></div>
    <div className="product-wrapper">
       
    { ProductListMemoize }
    
    <div className="pagination">
        <div onClick={goBackPage} className="prev-page"> &lt; prev page</div>
        <div className="pagination-headline">{cur_page} of {number_of_pages}</div>
        <div onClick={goForwardPage}  className="next-page" > &gt; next page</div></div>
    </div>
    <div className="details-wrapper">{prdmodal && shownProduct !== null && <ProdDetails highest_id={ findHighestID } chosenprd={shownProduct} aNewProd={addNewProduct} updateExistingProduct={updateProd} />}</div>
    <Footer /></>);
}
export default Prods;