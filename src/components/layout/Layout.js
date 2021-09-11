import logo from "../../logo.jpg";
import classes from "./Layout.module.css";
import Divider from '@material-ui/core/Divider';


function Layout(props) {
  return (
    <div>
      <div className={classes.layout}>
        <img src={logo} className={classes.logo} alt="logo" />
        <span className={classes.subheader}>
          Fiber optic network planning, simplified
        </span>
        <br/><br/>
        <Divider />
      </div>
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}
export default Layout;
