import styles from "../Dashboard/Dashboard.module.css";
import { useState } from "react";
import Loader from "../../components/UI/loader/loader";

import Editor from "../../components/Editor/Editor";
import { EditorState } from "draft-js";
import Button from "../../components/UI/Button/Button";
export default function SendMail(props) {
  const [editor, setEditor] = useState(() => EditorState.createEmpty());
  const [htmlContent, setHtmlContent] = useState("");
  // props will have auth object which will have authentication details
  const [from, setFrom] = useState(props.auth.email);
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [sending, setSending] = useState(false);
  const handleSendEmailSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    fetch("/api/mail/sendmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "API-Key": "secret",
      },
      body: JSON.stringify({
        to,
        from,
        body: htmlContent,
        subject,
        id: props.auth.id,
      }),
    })
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
          setSending(false);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form id="send-email" method="POST">
      <fieldset>
        <label htmlFor="from">From</label>
        <select value={from} id="from" required>
          <option value={props.auth.email}>{props.auth.email}</option>
        </select>
      </fieldset>
      <fieldset>
        <label htmlFor="to">To</label>
        <input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          type="text"
          id="to"
          name="to"
          placeholder="Send To"
          autoComplete="true"
          required
        />
      </fieldset>
      <fieldset>
        <label htmlFor="subject">Subject</label>
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          type="text"
          id="subject"
          name="subject"
          placeholder="What's up"
        />
      </fieldset>
      <fieldset>
        <label htmlFor="body">Message</label>
        <div id="body" className={styles.Dashboard_body_editor}>
          <Editor
            setHtml={setHtmlContent}
            editorState={editor}
            onedit={setEditor}
          />
        </div>
      </fieldset>
      {sending ? (
        <div className={styles.Dashboard_loader}>
          <Loader />
        </div>
      ) : (
        <Button func={handleSendEmailSubmit} disable={sending}>
          Send Email
        </Button>
      )}
    </form>
  );
}
