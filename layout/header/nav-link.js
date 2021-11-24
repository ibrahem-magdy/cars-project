import { Link as Navlink } from "@chakra-ui/react";
import Link from "next/link";
import PropTypes from "prop-types";

const NavLink = ({ url, text, ...props }) => {
  return (
    <Link href={url}>
      <Navlink {...props} cursor="pointer">
        {text}
      </Navlink>
    </Link>
  );
};

NavLink.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default NavLink;
