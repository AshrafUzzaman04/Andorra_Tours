/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
// react-quill components
import ReactQuill from "react-quill";

// react-quill styles
import "react-quill/dist/quill.snow.css";

// Custom styles for the SoftEditor
import SoftEditorRoot from "components/SoftEditor/SoftEditorRoot";


function SoftEditor(props) {
  const modules = {
    toolbar: [
      [{ 'font': [] }],                        // Font family
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],  // Header levels
      [{ 'size': ['small', false, 'large', 'huge'] }],  // Font size
      ['bold', 'italic', 'underline', 'strike'],        // Text formatting
      [{ 'color': [] }, { 'background': [] }],          // Text and background color
      [{ 'script': 'sub' }, { 'script': 'super' }],      // Subscript / Superscript
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],     // Lists
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // Indent/Outdent
      [{ 'align': [] }],                               // Text alignment
      ['blockquote', 'code-block'],                    // Blockquote and code block
      ['link', 'image', 'video'],                      // Links, images, and videos
      ['clean']                                        // Clear formatting
    ],
  };


  // Define the formats (all formatting options supported in the editor)
  // const formats = [
  //   'font', 'header', 'size', 'bold', 'italic', 'underline', 'strike',
  //   'color', 'background', 'script', 'list', 'bullet', 'indent',
  //   'align', 'blockquote', 'code-block', 'link', 'image', 'video'
  // ];
  return (
    <SoftEditorRoot>
      <ReactQuill modules={modules}
        theme="snow"
        {...props} />
    </SoftEditorRoot>
  );
}

export default SoftEditor;


// import React, { useEffect } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import "quill-better-table/dist/quill-better-table.css";
// import Quill from "quill";
// import QuillBetterTable from "quill-better-table";
// import SoftEditorRoot from "components/SoftEditor/SoftEditorRoot";

// export default function SoftEditor(props) {
//   useEffect(() => {
//     Quill.register('modules/better-table', QuillBetterTable, true);

//     console.log('better-table module registered successfully');
//   }, []);

//   const modules = {
//     toolbar: [
//       ['bold', 'italic', 'underline', 'strike'],
//       ['table']
//     ],
//     'better-table': {
//       // Add any specific configurations if necessary
//     }
//   };

//   return (
//     <SoftEditorRoot>
//       <ReactQuill
//         modules={modules}
//         theme="snow"
//         {...props}
//       />
//     </SoftEditorRoot>
//   );
// }
