import { HStack, Image, Spacer, Text } from "@chakra-ui/react";
import BurgerMenu from "./burger";
import SearchBar from "./searchbar";
import Usertab from "../user/usertab/usertab";
import Login from "../user/login";
import SignUp from "../user/signup";
import { useUser } from "../user/userContext";

const NavBar = () => {
  const { user } = useUser();
  return (
    <>
      <HStack justifyContent="space-between" px={1} py={1}>
      {(user.user) ? (
          <Usertab />
        ) : (
          <>
            {/* <SearchBar /> */}
            <Image src="assets/LogoName.svg" />
            <Login />
            <SignUp />
          </>
        )}

        <Spacer />
       
        <BurgerMenu />
        
      </HStack>
    </>

  );
};
export default NavBar;