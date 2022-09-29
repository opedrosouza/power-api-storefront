
interface LogoInterface {
  size: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoInterface> = ({ size }) => {
  return (
    <h1 className={`font-thin text-gray-900 ${size == 'sm' ? 'text-xl' : 'text-2xl'}`}>Power <strong className='font-bold'>Contacts</strong></h1>
  );
}

export default Logo;
