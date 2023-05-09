
import React from "react";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Header,
  HeadingLevel,
} from "docx";
import wordwrap from "wordwrap";
import { saveAs } from "file-saver";
export default function GenerateDocx({ outputs }) {


  const generate = () => {
    const doc = new Document({
      sections: [
        // {
        //   children: [
        //     new Paragraph({
        //       text: "Summary AI",
        //       heading: HeadingLevel.TITLE,
        //       bold: true,
        //     }),
        //   ],
        // },
        
        ...outputs.map((output)=>{
          return {
            headers: {
              default: new Header({
                children: [new Paragraph({
                  text: `${output.prompt}`,
                  heading: HeadingLevel.TITLE
                })],
              }),
            },
            children: [
              new Paragraph({
                  children: [
                    ...output.value.split("\n").map(
                      (i) =>
                        new TextRun({
                          text: `${i}`,
                          size: 28,
                          break: 1,
                        })
                    ),
                  ],
                })
            ],
          }
        })

      ],
    });
    console.log(doc);
    console.dir(doc)
    Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, `Summary AI_${new Date().toLocaleDateString()}.docx`);saveAs(blob, `Summary AI_${new Date().toLocaleDateString()}.docx`);
      console.log("Document created successfully");
    });
  };
  return (
    <div>
      <button onClick={generate}>Download Docx</button>
    </div>
  );
}












// outputs.map(output=>{
//     headers: {
//         default: new Header({
//           children: [new Paragraph(`Header 2`)],
//         }),
//       },
//       children: [
//         new Paragraph({
//             children: [
//               ...output.value.split("\n").map(
//                 (i) =>
//                   new TextRun({
//                     text: `${i}`,
//                     size: 28,
//                     break: 1,
//                   })
//               ),
//             ],
//           })
//       ],
// })


// copy 
// const doc = new Document({
//     sections: [
//       {
//         children: [
//           new Paragraph({
//             text: "Summary AI",
//             heading: HeadingLevel.TITLE,
//             bold: true,
//           }),
//         ],
//       },
      
//       {
//         headers: {
//           default: new Header({
//             children: [new Paragraph(`Header 2`)],
//           }),
//         },
//         children: [
//           ...outputs.map(
//             (output) =>
//               new Paragraph({
//                 children: [
//                   new TextRun({
//                     text: `${output.prompt}`,
//                     bold: true,
//                     break: 1,
//                     size: 50,
//                   }),

//                   ...output.value.split("\n").map(
//                     (i) =>
//                       new TextRun({
//                         text: `${i}`,
//                         size: 28,
//                         break: 1,
//                       })
//                   ),
//                 ],
//               })
//           ),
//         ],
//       },
//     ],
//   });