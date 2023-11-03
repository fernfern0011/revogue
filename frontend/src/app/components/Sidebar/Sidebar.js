import Gender from "./Gender/Gender";
import Size from "./Size/Size";
import Category from "./Category/Category";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <section className="sidebar">
      <Gender />
      <Size />
      <Category />
    </section>
  );
};

export default Sidebar;
