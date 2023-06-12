export const WPImage = ({wpimage, className = '', ...props}) => {
  if(!wpimage){
    return <img src="" className={className} alt="NO IMAGE" {...props}/>
  }

  if(typeof wpimage === 'string'){
    return <img src={wpimage} className={className} alt="temporary" {...props}/>
  }

  return (
    <img
      className={className}
      src={wpimage.sizes['2048x2048']}
      srcSet={`
             ${wpimage.sizes['medium']} 300w,
             ${wpimage.sizes['medium_large']} 768w,
             ${wpimage.sizes['large']} 1024w,
             ${wpimage.sizes['1536x1536']} 1536w,
             ${wpimage.sizes['2048x2048']} 2048w`}
      sizes="(max-width: 300px) 300px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1536px) 1536px, 2048px"
      width={wpimage.width}
      height={wpimage.height}
      alt={wpimage.alt}
      {...props}
    />
  )
}