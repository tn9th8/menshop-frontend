import { Box, HStack } from "@chakra-ui/react";
import { PiTicketBold } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { LuShoppingCart } from "react-icons/lu";
import routes from "routes";
import ActionItem from "./ActionItem";
import { useStores } from "hooks";
import { useEffect } from "react";
import { observer } from "mobx-react";
import { IRequestTour, IRequsetCheckoutReview } from "interfaces/checkout";
import UserProfile from "components/UserProfile";

interface IHeaderProps {
  openLoginModal: () => void;
  color?: string;
  underLineHoverColor?: string;
  hoverColor?: string;
}

const Action = (props: IHeaderProps) => {
  const { cartStore } = useStores();
  const { authStore } = useStores();
  const { cartCount } = cartStore;
  const { isLogin } = authStore;

  const route = useRouter();

  useEffect(() => {
    if (!isLogin) {
      return;
    }
    cartStore.fetchCartCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function gotoCartPage() {
    route.push(routes.cart.value);
  }

  function gotoOrderPage() {
    route.push(routes.myOrder.value);
  }

  const { openLoginModal, color, underLineHoverColor, hoverColor } = props;
  return (
    <HStack
      height="100%"
      justifyContent="center"
      alignItems="center"
      marginTop="14px"
    >
      <ActionItem
        color={color}
        underLineHoverColor="teal.500"
        hoverColor="teal.500"
        actionIcon={<PiTicketBold />}
        title="Đơn hàng"
        to={gotoOrderPage}
      />
      <ActionItem
        color={color}
        underLineHoverColor="teal.500"
        hoverColor="teal.500"
        actionIcon={<LuShoppingCart />}
        title="Gỉỏ hàng"
        to={gotoCartPage}
      />
      <UserProfile />
    </HStack>
  );
};

export default observer(Action);
