import styles from "./editor.module.css";
import {Editor} from "react-draft-wysiwyg";
import {EditorState} from "draft-js";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {convertToHTML} from "draft-convert";
export default function WYSIWYG(props){
    const handleEditorChange = (state)=>{
        props.onedit(state);
        convertingToHtml()
    }
    const convertingToHtml = ()=>{
        
        const currentHtml = convertToHTML(props.editorState.getCurrentContent());
        console.log(currentHtml)
        props.setHtml(currentHtml);
    }
    return (
        <Editor editorClassName={styles.editor_editor} wrapperClassName={styles.editor_wrapper} defaultEditorState={props.editorState} onEditorStateChange={handleEditorChange}/>
    )
}