import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/actions/productActions';
import ProductCard from '../components/ProductCard';

interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
    category: string;
}

interface RootState {
    products: {
        items: Product[];
        loading: boolean;
        error: string | null;
    };
}

const Catalogue: React.FC = () => {
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.products.items);
    const loading = useSelector((state: RootState) => state.products.loading);
    const error = useSelector((state: RootState) => state.products.error);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="catalogue">
            <h1>Product Catalogue</h1>
            <div className="product-list">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Catalogue;