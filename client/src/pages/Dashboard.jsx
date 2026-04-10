import React, { useEffect, useState } from "react";
import { FilePenLineIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, XIcon } from "lucide-react";
import { dummyResumeData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

 const Dashboard = () => {

const colors = [
  "#9333ea", // purple
  "#d97706", // orange
  "#dc2626", // red
  "#0284c7", // blue
  "#16a34a"  // green
];
  const [allResumes, setAllResumes] = useState([])
  const [showCreateResumes, setShowCreateResumes] = useState(false)
  const [showUploadResumes, setShowUploadResumes] = useState(false)
  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')

  const navigate = useNavigate()

  const loadAllResumes = async () => {
    setAllResumes(dummyResumeData)
  }

  const createResume = async (event) => {
    event.preventDefault()
    setShowCreateResumes(false)
    navigate(`/app/builder/res123`)
  }

  const uploadResume = async (event) => {
    event.preventDefault()
    setShowUploadResumes(false)
    navigate(`/app/builder/res123`)
  }

  useEffect(() => {
    loadAllResumes()
  }, [])


  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Welcome */}
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, Swagat
        </p>

        {/* Buttons */}
        <div className="flex gap-4">

          {/* Create Resume */}
          <button onClick={()=> setShowCreateResumes(true)} className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 
          border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer">

          <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full" />

            <p className="text-sm group-hover:text-indigo-600 transition-all duration-300">
              Create Resume
            </p>

          </button>

          {/* Upload Resume */}
          <button onClick={()=> setShowUploadResumes(true)}  className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border
           border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer">

            <UploadCloud className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 text-white rounded-full" />

            <p className="text-sm group-hover:text-indigo-600 transition-all duration-300">
              Upload Existing
            </p>

          </button>

        </div>

        <hr className='border-slate-300 my-6 sm:w-[350px]' />

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
         {allResumes.map((resume, index) => {
         const baseColor = colors[index % colors.length];

    return (
      <button key={index} onClick={()=> navigate(`/app/builder/${resume._id}`)} className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border 
      group hover:shadow-lg transition-all duration-300 cursor-pointer"
        style={{ background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
          borderColor: baseColor + "40", }}>
        <FilePenLineIcon className="size-5 group-hover:scale-105 transition-all px-1 text-center"
          style={{ color: baseColor }}/>
        <p className="text-ms group-hover:scale-105 transition-all px-2 text-center"
          style={{ color: baseColor }}>{resume.title} </p>
        <p className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center"
        style={{ color: baseColor + "90" }}> Updated on {new Date(resume.updatedAt).toLocaleDateString()}</p>

      <div className="absolute top-1 right-1 group-hover:flex items-center hidden">
      <TrashIcon className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors" />
      <PencilIcon className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors" />
      </div>
    </button>
    );
  })}
</div>

{showCreateResumes && (
  <form onSubmit={createResume} onClick={()=> setShowCreateResumes(false)} 
  className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center">
    <div onClick={(e) => e.stopPropagation()} className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6">
    <h2 className="text-xl font-semibold mb-4">Create a Resume</h2>
    <input onChange={(e)=>setTitle(e.target.value)}
        type="text" 
        placeholder="Enter resume title"
        className="w-full px-4 py-2 mb-4 border rounded focus:border-green-600 focus:ring-green-600"
        required
      />

      <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
        Create Resume </button>
      <XIcon className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
        onClick={() =>{setShowCreateResumes(false); setTitle('')}}/>
        </div>
    
  </form>
)} 


{showUploadResumes && (
  <form onSubmit={uploadResume} onClick={()=> setShowUploadResumes(false)} 
  className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center">
    <div onClick={(e) => e.stopPropagation()} className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6">
    <h2 className="text-xl font-semibold mb-4">Upload a Resume</h2>
    <input onChange={(e)=>setTitle(e.target.value)}
        type="text"
        placeholder="Enter resume title"
        className="w-full px-4 py-2 mb-4 border rounded focus:border-green-600 focus:ring-green-600"
        required
      />
      <div>
        <label htmlFor="resume-input" className="block text-sm text-slate-700">
          Select resume file
      
     <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md 
     p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors">
      {resume ? (
    <p className="text-green-700">{resume.name}</p>
      ) : (
    <>
    <UploadCloud className="size-14 stroke-1" />
      <p>Upload resume</p>
    </>
  )}
</div>
 </label>
  <input type="file" id='resume-input' accept='.pdf' hidden onChange={(e)=> setResume(e.target.files[0])}/> 
    </div>
     
      <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
        Upload Resume </button>
      <XIcon className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
        onClick={() =>{setShowUploadResumes(false); setTitle('')}}/>
        </div>
    
  </form>
)} 

      </div>
    </div>
  );
};

export default Dashboard;