import Image, { ImageProps } from "next/image"

interface ImageComponentProps extends ImageProps {
  wrapperClasses: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ wrapperClasses, src, width, height, alt, className }) => {
  return (
    <div className={`relative ${wrapperClasses}`}>
      <Image className={className} src={src} alt={alt} layout="fill"/>
    </div>
  )
}

export default ImageComponent;
