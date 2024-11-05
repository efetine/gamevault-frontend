import { CartPage } from '~/components/cart/cart-page';
import SessionComponent from '~/components/sessions/auth-token';
export default function CartMainPage() {
  return (
    <SessionComponent>
      <CartPage />
    </SessionComponent>
  );
}
