import Wrapper from '../assets/wrappers/JobInfo';

interface JobInfoProps {
  icon: JSX.Element;
  text: string;
}

const JobInfo = ({ icon, text }: JobInfoProps) => {
  return (
    <Wrapper>
      <span className='icon'>{icon} </span>
      <span className='text'>{text} </span>
    </Wrapper>
  );
};
export default JobInfo;
