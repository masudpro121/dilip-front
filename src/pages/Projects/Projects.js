import React, { useContext, useEffect, useState } from 'react';
import withNavbar from '../../hocs/withNavbar';
import './projects.css';
import { generateData } from '../../apis/chatgpt';
import Cards from '../../components/Cards/Cards';
import GeneratePdfViewer, { GeneratePdf } from '../../components/GeneratePdf/GeneratePdf';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReactDOM from 'react-dom/client';
import { MyContext } from '../../App';
import Loading from '../../assets/img/loading.gif'
import { ToastContainer, toast } from 'react-toastify';
import {RiMessage3Line} from 'react-icons/ri'
import {MdOutlineNotificationsActive} from 'react-icons/md'
import {FiSearch} from 'react-icons/fi'
import GenerateDocx from '../../components/GenerateDocx/GenerateDocx';
import GeneratePptx from '../../components/GeneratePptx/GeneratePptx';
import { saveProject } from '../../apis/server';
import debounce from '../../utils/debounce';

function Projects() {
  const {outputs, setOutputs} = useContext(MyContext)
  const [inputs, setInputs] = useState([{ id: 0, prompt: ''}]);
  const [output, setOutput] = useState({});
  const [projectName, setProjectName] = useState('')
  const [projectTag, setProjectTag] = useState('')
  const  [isLoading, setIsLoading] = useState(false)
  
  useEffect(()=>{
      if(output.value){
        const unordered = [...outputs, output]
        const ordered = unordered.sort((a, b)=>a.id - b.id)
        setOutputs(ordered)
      setIsLoading(false)
      }
  },[output])

  const addInputField = () => {
    const newInput = { id: inputs[inputs.length-1].id+1, prompt: '' };
    setInputs([...inputs, newInput]);
  };

  const handleInputChange = (e, id) => {
    const updatedInputs = inputs.map(input =>
      input.id === id ? { ...input, prompt: e.target.value } : input
    );
    setInputs(updatedInputs);
  };


const generateResult = async () => {
    setIsLoading(true)
  setOutputs([])
  inputs.forEach( inp => {
    if(inp.prompt){
      generateData(inp.prompt)
      .then(res=>{
        setOutput({id: inp.id, prompt: inp.prompt, value: res.data.choices[0].text})
      })
    }else{
      toast.error("Please fill the prompt")
      setIsLoading(false)
    }
  })
};

const removeField = (id) =>{
  const filtered = inputs.filter(inp=>inp.id != id)
  setInputs(filtered)
}

const handleSave = () => {
  saveProject({name: projectName, tag:projectTag, prompts: outputs})
  .then(res=>res.json())
  .then(res=>{
    toast.success("Saved")
  })
}

const fakeOutputs = [
  {
    id: 1, 
    prompt:'I’m an ER doctor: Here’s what I found when I asked ChatGPT to diagnose my patients',
    value:`by Josh Tamayo-Sarver, MD, PhD
    With news that ChatGPT successfully “passed” the U.S. Medical Licensing Exam, I was curious how it would perform in a real-world medical situation. As an advocate of leveraging artificial intelligence to improve the quality and efficiency of healthcare, I wanted to see how the current version of ChatGPT might serve as a tool in my own practice.
    
    So after my regular clinical shifts in the emergency department the other week, I anonymized my History of Present Illness notes for 35 to 40 patients — basically, my detailed medical narrative of each person’s medical history, and the symptoms that brought them to the emergency department — and fed them into ChatGPT.
    
    The specific prompt I used was, “What are the differential diagnoses for this patient presenting to the emergency department [insert patient HPI notes here]?”
    
    The results were fascinating, but also fairly disturbing.
    
    OpenAI’s chatbot did a decent job of bringing up common diagnoses I wouldn’t want to miss — as long as everything I told it was precise, and highly detailed. Correctly diagnosing a patient as having nursemaid’s elbow, for instance, required about 200 words; identifying another patient’s orbital wall blowout fracture took the entire 600 words of my HPI on them.
    
    For roughly half of my patients, ChatGPT suggested six possible diagnoses, and the “right” diagnosis — or at least the diagnosis that I believed to be right after complete evaluation and testing — was among the six that ChatGPT suggested.
    
    Not bad. Then again, a 50% success rate in the context of an emergency room is also not good.
    
    ChatGPT’s worst performance happened with a 21-year-old female patient who came into the ER with right lower quadrant abdominal pain. I fed her HPI into ChatGPT, which instantly came back with a differential diagnosis of appendicitis or an ovarian cyst, among other possibilities.
    
    But ChatGPT missed a somewhat important diagnosis with this woman.
    
    She had an ectopic pregnancy, in which a malformed fetus develops in a woman’s fallopian tube, and not her uterus. Diagnosed too late, it can be fatal — resulting in death caused by internal bleeding. Fortunately for my patient, we were able to rush her into the operating room for immediate treatment.
    
    Notably, when she saw me in the emergency room, this patient did not even know she was pregnant. This is not an atypical scenario, and often only emerges after some gentle inquiring:
    
    “Any chance you’re pregnant?”
    
    Sometimes a patient will reply with something like “I can’t be.”
    
    “But how do you know?”
    
    If the response to that follow-up does not refer to an IUD or a specific medical condition, it’s more likely the patient is actually saying they don’t want to be pregnant for any number of reasons. (Infidelity, trouble with the family, or other external factors.) Again, this is not an uncommon scenario; about 8% of pregnancies discovered in the ER are of women who report that they’re not sexually active.
    
    But looking through ChatGPT’s diagnosis, I noticed not a single thing in its response suggested my patient was pregnant. It didn’t even know to ask.
    
    My fear is that countless people are already using ChatGPT to medically diagnose themselves rather than see a physician. If my patient in this case had done that, ChatGPT’s response could have killed her.
    
    ChatGPT also misdiagnosed several other patients who had life-threatening conditions. It correctly suggested one of them had a brain tumor — but missed two others who also had tumors. It diagnosed another patient with torso pain as having a kidney stone — but missed that the patient actually had an aortic rupture. (And subsequently died on our operating table.)
    
    In short, ChatGPT worked pretty well as a diagnostic tool when I fed it perfect information and the patient had a classic presentation.
    
    This is likely why ChatGPT “passed” the case vignettes in the Medical Licensing Exam. Not because it’s “smart,” but because the classic cases in the exam have a deterministic answer that already exists in its database. ChatGPT rapidly presents answers in a natural language format (that’s the genuinely impressive part), but underneath that is a knowledge retrieval process similar to Google Search. And most actual patient cases are not classic.
    
    My experiment illustrated how the vast majority of any medical encounter is figuring out the correct patient narrative. If someone comes into my ER saying their wrist hurts, but not due to any recent accident, it could be a psychosomatic reaction after the patient’s grandson fell down, or it could be due to a sexually transmitted disease, or something else entirely. The art of medicine is extracting all the necessary information required to create the right narrative.
    
    Might ChatGPT still work as a doctor’s assistant, automatically reading my patient notes during treatment and suggesting differentials? Possibly. But my fear is this could introduce even worse outcomes.
    
    If my patient notes don’t include a question I haven’t yet asked, ChatGPT’s output will encourage me to keep missing that question. Like with my young female patient who didn’t know she was pregnant. If a possible ectopic pregnancy had not immediately occurred to me, ChatGPT would have kept enforcing that omission, only reflecting back to me the things I thought were obvious — enthusiastically validating my bias like the world’s most dangerous yes-man.
    
    None of this suggests AI has no potentially useful place in medicine, because it does.
    
    As a human physician, I’m limited by how many patients I can personally treat. I expect to see roughly 10,000 patients in my lifetime, each of them with a unique body mass, blood pressure, family history, and so on — a huge variety of features I track in my mental model. Each human has countless variables relevant to their health, but as a human doctor working with a limited session window, I focus on the several factors that tend to be the most important historically.
    
    So for instance, if I review a patient’s blood test and see high levels of hemoglobin A1C, then I diagnose them as likely to have the early stages of diabetes. But what if I could keep track of the countless variables about the person’s health and compare them with other people who were similar across all the millions of variables, not just based on their hemoglobin A1C? Perhaps then I could recognize that the other 100,000 patients who looked just like this patient in front of me across that wide range of factors had a great outcome when they started to eat more broccoli.
    
    This is the space where AI can thrive, tirelessly processing these countless features of every patient I’ve ever treated, and every other patient treated by every other physician, giving us deep, vast insights. AI can help do this eventually, but it will first need to ingest millions of patient data sets that include those many features, the things the patients did (like take a specific medication), and the outcome.
    
    In the meantime, we urgently need a much more realistic view from Silicon Valley and the public at large of what AI can do now — and its many, often dangerous, limitations. We must be very careful to avoid inflated expectations with programs like ChatGPT, because in the context of human health, they can literally be life-threatening.`
  },
  {
    id: 2, 
    prompt:'Here’s How Two New Orleans Teenagers Found a New Proof of the Pythagorean Theorem',
    value:`It was, above anything else, an editorial imperative. The right thing to do for our readers.

    As The Atlantic’s deputy executive editor Sarah Yager puts it, making journalism is really about creating a record of the world around us. It’s about documenting what is happening and hopefully helping readers to make sense of it. And there’s enormous value in being able to learn from what was happening in the past, and how history was interpreted in real time.
    
    The Atlantic had wanted to digitize its archive ever since it started publishing online in 1995. At that moment, a website for our magazine introduced the new opportunity for people to read the journalism we were writing that day, online. Our magazine, however, had been continuously printed and published since the autumn of 1857. There were a lot of stories that our readers couldn’t access online. From time to time editors would manually reproduce archival articles, but the massive task of making the archive available remained elusive for almost three decades.
    
    How does one take tens of thousands of words from our print pages and publish them on the internet? How would The Atlantic suddenly go from not offering this content to having it on its data structure, its website presence? What are the mechanical steps to getting there? These were some of the questions that our product and technology colleagues asked themselves in May 2021, when the magazine committed to the challenge of bringing the archive online.
    
    First steps
    At the beginning of a project of this scale, there are many different visions of what it should look like, of all the features it could include. As Executive Director of Product Carson Trobich explains, it can be hard to figure out how to put something that large into its first steps.
    
    “You need to identify the limits to your ambition and put the initial excitement into research.”
    
    Carson Trobich, Executive Director, Product
    
    To orient our visions and find first steps, our product colleagues researched 20 publishers to see how they were resurfacing and repackaging archival content.
    
    The team identified that some publishers’ archives only consisted of scans of printed pages, while others transformed pages into digital text. An archive could be fully available online or just in part. It could live on a publisher’s website adjacent to modern content, or it could be its own separate product, with additional functionalities. Some archives even live off platform.
    
    The Atlantic decided early on that it was our ambition to make the full archive available. For transparency to our readers, and for the historical record, we wanted to share it all — from our most enduring reporting to some stories that have rightly fallen into obscurity. As our editor in chief Jeffrey Goldberg wrote in an editor’s note introducing the project, “It’s all here: the good, the bad, the brilliant, the offensive, the ridiculous. We knew from the start that we would engage in no censorship, trimming, or dodging.”
    
    By building space for the archive to live on the current website, our product colleagues worked on digitizing and presenting past articles in our modern article template. These are the steps they followed to get there:
    
    1) Transcribing the content: The Atlantic came into this project with PDF scans of all the pages that it had ever published. To make sense of all that information, our engineering team worked with a vendor specializing in digitizing media magazine archives. The contractors used optical character recognition and high resolution scans to identify different regions and zones within each page — mapping the position of everything The Atlantic ever printed.
    
    This first step also required a schema definition, which taught the vendor to recognize what they were digitizing and laid the foundation for content ingestion. This way, the vendor learned how to identify content types (e.g. headlines or page numbers) and tag them in a way that our own internal systems could understand.
    
    This process produced highly detailed packs of XML files, PDFs, and JPEGs that amounted to 400 GB of data.
    
    2) Ingesting the data: The next step was to import it all into our CMS. Before our engineering colleagues could do this, they needed to assess what types of content were in the archive, to determine what should or shouldn’t be imported. To achieve this, they built an index of 110,000 pieces of content. Not all of that would turn into article pages during the importing process. Just over half, for example, were advertising.
    
    Engineering, as our Systems Architect Chris Barna describes, can often be loaded with resource constraints. They had the opposite issue here–too much information. The team narrowed down what The Atlantic wanted to republish in the digital archive: articles, short stories, poetry. Or better, what we didn’t want to publish: ads, table of contents. Then, they took that index and turned it into articles in our CMS, the same way our contemporary magazine articles are uploaded. It worked great–until they started running into problems.
    
    “For our system, it’s easy to publish 30 articles at a time. We needed to publish a thousand articles at a time.”
    
    Chris Barna, Systems Architect
    
    3) Publishing thousands of articles at a time: A lot of the later stages of the conversion and importing process were about taking our bulk actions and making them bulkier. That is, scaling from operating on a single magazine issue to operating on a year’s or even a decade’s worth of content.
    
    While our product and engineering colleagues figured out the digitizing part of the process, the audience research team talked with readers to identify if and how they would use The Atlantic’s archive. Because digitizing the archive and turning it into a product that readers will enjoy are two different things:
    
    Digitization is the transcription of a print archive into a consumable and useful format.
    
    Productization consists of the ideation, research, and execution of how we present this content to our audiences.
    
    Understanding readers’ experience with the depth of our journalism was key to see what kind of product development we should be focusing on. How would all this fit in our readers’ lives, if at all?
    
    After conducting interviews with Atlantic readers, the audience research team identified two primary profiles of archive discovery. We called them the seekers and the surfers.
    
    Seekers typically researched a specific topic or a time period, mostly for professional purposes. They engaged deeply and often used search functionality to find archives.
    
    Surfers would come across archives serendipitously while surfing the internet. They were motivated by curiosity and wanted historical context on contemporary issues.
    
    There were more surfers than seekers, but they engaged less deeply and less frequently. Whatever product and design direction we chose, we wanted to serve our readers in both modes.`
  },
  {
    id: 3, 
    prompt:'11111111111111111111111111111111111111111111111111111111111111111111111111111111111111I Won the 1968 Boston Marathon. And Ran Many More. After the Bombs, Everything Changed',
    value:`zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaMore than a half-century ago I ran each Boston Marathon consumed by thoughts of winning. In April 1968, I actually achieved that impossible dream.

    These days, 55 years later, I’m still running Boston. Mainly to give thanks. So many thanks. It doesn’t matter how slowly I cover the course, or where I finish. The miracle is that I can still run 26.2 miles on foot from rural Hopkinton to downtown Boston’s Copley Square.
    
    Here’s one small example. Three weeks ago, I was ready to scratch from this year’s race. I pulled a groin muscle somehow, and had to abandon three successive runs after just two miles. I felt a thick gloom settling over me. But then one short visit to a physical therapist shocked my muscle back to functional health.
    
    Thank you, amazing human body. Thank you, muscle fibers that are now re-aligned. Thank you, Steve, my PT. I’m not absolutely positive I can go the distance on Monday, April 17, but I’m feeling optimistic again.
    
    In April 1968, I wanted to win Boston more than you can imagine. My coach and mentor, John J. Kelley, had been the last American winner — way back in 1957. I hoped to pay homage to him.
    
    Also, I had trained insanely hard. They tell me the 1960s were a time of “sex, drugs, and rock ‘n roll” on American college campuses. Maybe that’s true. But I couldn’t confirm it to you.
    
    I went to bed every night at 9:30 pm, and woke up the next morning at 6 am for the first of my two daily runs — a 9-miler. On spring break, while others frolicked on the Florida beaches for a week, I logged 175 miles in training. My more typical weeks were still well over 100 miles.
    
    Marathon day was Saturday, April 19. That means I command a footnote in Boston Marathon history. I was the last runner to win a Boston that wasn’t on a Monday. The day dawned sunny and warm.
    
    Famed sports columnist Red Smith once quipped that writing wasn’t difficult. You just had to “open a vein and bleed.”
    
    That’s how I feel about my Boston run in 1968. Winning wasn’t that tough. I only had to run to the edge of implosion. Going up Heartbreak Hill at the 21-mile mark, I pushed harder than ever before. I knew I couldn’t sustain the effort for long.
    
    But I didn’t let up. I needed to break away from the runner behind me. Because there was a problem. I knew him, and he knew me, and we both knew he had a faster finishing kick. If I couldn’t gap him on Heartbreak, I had no chance to win.
    
    The Boston course runs West to East, especially over the Newton hills. With the mid-afternoon sun on our back, we runners see our shadows stretched out in front. The runner tailing me chose to sit back a half stride. That meant I couldn’t see him out of the corner of my eye. But his shadow! There it was … like a haunting Edgar Allen Poe creation.
    
    I couldn’t go any faster, but I did anyway. My breathing turned violent — a swirling tornado. This was my last chance. I had to give it everything. But the shadow never budged!
    
    I still remember the precise moment when I reached the top of Heartbreak Hill. The shadow! Still there. I felt total despair. My knees buckled briefly, and I wondered if there was any point in fighting on. I thought: “You’re racing a ghost, and he’s going to win in the end. You might as well quit now, and save yourself further suffering.”
    
    Somehow I mounted the resolve to stumble onward. A few minutes later, almost blinded by the sweat in my eyes, I looked for the shadow. Gone! My ghostly pursuer had cramped on the downhills. (By the way, we’re good friends now.)
    
    I’ve heard other marathon winners talk about how they enjoyed the last several miles. They got to “savor” their victory. Not me. I only tasted fear. I ran the last 5 miles like an antelope with a Big Cat in hot pursuit.
    
    I would have made an easy catch, but no one managed to chase me down. At the finish, I collapsed like a wet noodle into the arms of Jock Semple, the legendary race organizer
    
    Over the next 20 years, I ran Boston now and again. Then I began returning on the precise 5-year anniversaries of 1968.`
  },
]

const handleTest = () => {
  console.log('handle test');
}
  return (
    <>
    <div className='projects'>
      <div className="sec1">
        <div className='search-cont'>
          <FiSearch className='search-icon' />
          <input type="text" placeholder='Search..' />
        </div>
        <div className='iconCont'>
          <RiMessage3Line />
        </div>
        <div className='iconCont'>
          <MdOutlineNotificationsActive />
        </div>
      </div>
      <div className='mt-4'>
        <h3>Summary AI</h3>
      </div>
        <div className='prompt mt-3 mb-4'>
          <h6 style={{width:'150px'}}>Project Name</h6>
          <input className='proj-input' onChange={(e)=>setProjectName(e.target.value)} type="text" placeholder='Please enter project name'  />
        </div>
        <div className='prompt mt-3 mb-4'>
          <h6 style={{width:'150px'}}>Project Tag</h6>
          <input className='proj-input' onChange={(e)=>setProjectTag(e.target.value)} type="text" placeholder='Please enter project tags. separated by comma ' />
        </div>
        <div className='inputs-cont'>
          <div className='inputs'>
            {inputs.map(input => (
              <div key={input.id} className='input'>
                <div className='d-flex inpx'>
                  <input
                    type='text'
                    placeholder='Send a message...'
                    value={input.prompt}
                    onChange={e => handleInputChange(e, input.id)}
                    onKeyUp= {e=>e.code == 'Enter' && addInputField()}
                  />
                  {
                    inputs.length>1 && <button onClick={()=>removeField(input.id)} className='cross-btn'>X</button>
                  }
                </div>
              </div>
            ))}
          </div>
          <div className='plusCont'>
            <button className="plus-btn" onClick={addInputField}>+</button>
          </div>
        </div>
        <div className="generate-btns">
        <div >
          {!isLoading && <button onClick={generateResult}>Generate</button>}
        </div>
        <div className='other-btns'>
        {
          outputs.length > 0  && <button onClick={debounce(handleSave, 300)}>Save</button>
        }
        {
          outputs.length > 0  && <GenerateDocx outputs={outputs} />
        }
        {
          outputs.length > 0  && <GeneratePptx outputs={outputs} />
        }
        {
          outputs.length > 0  && <div >
          <PDFDownloadLink document={<GeneratePdf outputs={outputs} />} fileName={'Summary AI_'+new Date().toLocaleDateString()}> 
          {({loading})=> <button>{loading?'Loading..':'Download PDF'}</button>}
          </PDFDownloadLink>
        </div>
        }
        </div>
        
        </div>
        {
            isLoading && (
              <div>
                <img src={Loading} alt="" />
              </div>
            )
        }

        {
          outputs && <Cards data={outputs} />
        }
    
        
    </div>
    <ToastContainer autoClose={2000} theme='dark' />
    </>
  );
}

export default withNavbar(Projects);
