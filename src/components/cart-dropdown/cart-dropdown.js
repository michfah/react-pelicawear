import './cart-dropdown.scss';

import Button from '../button/button';

const CartDropdown = () => {
    return (
        <div className="cart-dropdown-container">
            <div className="cart-items" />
            <Button>Go to Checkout</Button>
        </div>
    )
}

export default CartDropdown;