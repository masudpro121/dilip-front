import React from 'react'
import {
    Presentation, Slide, Text,
    Shape, Image, render
  } from "react-pptx"
  import pptxgen from "pptxgenjs";

export default function GeneratePptx({outputs}) {
    const generate = async() => {
        let pptx = new pptxgen();
       outputs.forEach(output=>{
        
        const lines = output.value.split("\n")
        const packs = []
        let s =[]
        let count =0;
        lines.forEach((l,id)=>{
             let splitted = l.split(' ')
             if((s.length+splitted.length)<250 && count<15){
                count++
                s = [...s, "\n", ...splitted]
             }else{
                count=0
                packs.push(s)
                s=[...splitted]
                splitted =[]
             }
             
             if(lines.length == id+1){
                packs.push(s)
                // packs.push(splitted)
             }
        })
        packs.forEach(pack=>{
            let slide = pptx.addSlide();
            slide.addText(output.prompt, { x: 0, y: 1, w:10,  fontSize: 14, fill: { color: "F1F1F1" }, align: "center" });
            slide.addText(pack.join(' '), { x: 1, y: 3.5, w:8,  fontSize: 12, fill: { color: "F1F1F1" }});
        })
       })
        pptx.writeFile({ fileName: "react-demo.pptx" });
    }
  return (
    <div>
        <button onClick={generate}>Download Powerpoint</button>
    </div>
  )
}
