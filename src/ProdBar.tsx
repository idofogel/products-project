// import React from 'react';
import logo from './logo.svg';
import arrrowup from './arrow_up.png';
import product from './Product';
import designer from './Designer.jpeg';

    type Props = {
  ind_show : number,
  prodct: product,
  changeDefModal:(prd: product) => boolean,
  deleteProd:(prd: product) => boolean
}

const ProdBar = ({ind_show, prodct, changeDefModal, deleteProd} : Props)=>{
    const changePrd = ()=> {
        changeDefModal(prodct);
    }
    
    return (<div onClick={changePrd} className="prod-bar">
        {(prodct.ID % 3 === 0) && <><img src={logo} className="product-image" alt="" /></>}
        {(prodct.ID % 3 === 1) && <><img src={arrrowup} className="product-image" alt="" /></>}
        {(prodct.ID % 3 === 2) && <><img src={designer} className="product-image" alt="" /></>}
        {/* <img src={logo} className="product-image" alt="" /> */}
        
        <div className="prod-bar-name" title={prodct.Name}>{prodct.Name}</div>
        <div className="prod-bar-desc" title={prodct.Description}>{prodct.Description}</div>
        <div className="prod-bar-desc" style={{top:'51px'}}>{prodct.Creation.toDateString()}</div>
        
        <div onClick={(event)=>{event.preventDefault();event.stopPropagation();deleteProd(prodct)}} className="prod-bar-delete">Delete</div>
    </div>);
}
export default ProdBar;