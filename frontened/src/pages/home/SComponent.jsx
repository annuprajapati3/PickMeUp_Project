const SComponent = ({head,text ,images})=>{
    return <>
    <div className="h-35 w-90 flex rounded-md bg-gray-100 ">
        <div className='ml-6 mr-4 my-3'>
            <p className='text-lg font-semibold mb-3'>{head}</p>
            <p className='text-xs'>{text}</p>
            <button className='h-8 w-25 bg-white rounded-xl mt-4'>Details</button>
        </div>
        <div>
            <img src={images} className='w-50 h-auto'></img>
        </div>
    </div>
    </>
}
export default SComponent;