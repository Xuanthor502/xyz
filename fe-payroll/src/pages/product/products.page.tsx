
import { Header } from "@/components/header/Header.components";
import Sidebar from "@/components/sidebar/sidebar";
import '../../styles/home.scss'
import { ProductManagement } from "@/components/product/products.table"; 



const ProductPage = () => {
    return (
        <>
            <Header></Header>
            <div className="home" >
                <Sidebar></Sidebar>
                <div className="homeContainer">
                    <ProductManagement></ProductManagement>
                </div>
            </div>
        </>

    )
}

export default ProductPage;