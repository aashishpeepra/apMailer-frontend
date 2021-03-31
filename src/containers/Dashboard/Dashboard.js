import { Switch, Route } from "react-router-dom";
import styles from "./Dashboard.module.css";
import SendMail from "../SendMail/SendMail";
import { showGreetings } from "../../utils/utils";
import Button from "../../components/UI/Button/Button";
export default function Dashboard(props) {
  return (
    <div id="user-dashboard" className={styles.Dashboard}>
      <section id="dashboard-navigation" className={styles.Dashboard_nav}>
        <div className={styles.Dashboard_nav_head}>
          <h2>{props.auth.name}</h2>
          <h5>{showGreetings()}</h5>
        </div>
        <div className={styles.Dashboard_nav_links}>
          <ul>
            <li>
              <Button to="/dashboard/send" type="link">
                Send Mail
              </Button>
            </li>
            <li>
              <Button to="/dashboard/activity" type="link">
                Recent Activity
              </Button>
            </li>
            <li>
              <Button to="/" type="link">
                Logout
              </Button>
            </li>
          </ul>
        </div>
      </section>
      <section className={styles.Dashboard_body}>
        <Switch>
          <Route path="/dashboard/send" render={() => <SendMail {...props} />} />
          <Route path="/dashboard/activity" render={()=><h1>Under construction</h1>}/>
        </Switch>
      </section>
    </div>
  );
}
