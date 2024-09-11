import {Link} from 'react-router-dom';

const Servicedata=[{
    id:'1',
    img:"https://b.zmtcdn.com/webFrontend/e5b8785c257af2a7f354f1addaf37e4e1647364814.jpeg",
    description:"Stay home and order to your doorstep",
    service:"Order Online",
    url:"Orderonline"},
    {
    id:'2',
    img:"https://b.zmtcdn.com/webFrontend/d026b357feb0d63c997549f6398da8cc1647364915.jpeg",
    description:"View the city's favourite dining venues",
    service:"Dining",
    url:""},
    {
    id:'3',
    img:"https://b.zmtcdn.com/webFrontend/d9d80ef91cb552e3fdfadb3d4f4379761647365057.jpeg",
    description:"Explore the city's top nightlife outlets",
    service:"Nightlife and Clubs",
    url:""}
]

export function Services(){
    return(
        <div className="serviceList">
            {Servicedata.map((service,index)=>{
                return(<Service key={index} service={service}></Service>)
            })}
        </div>
    );
}


const Service=(props)=>{
    const {id,img,description,service,url}=props.service;
    return(
        <div className="service">
            <button>
            <Link to={`/${url}`}>
                <img src={img} alt={service}></img>
                <div className="servicedesc">
                    <h4 className="link-h4">{service}</h4>
                    <p>{description}</p>
                </div>
            </Link>
            </button>
        </div>
    );
}
