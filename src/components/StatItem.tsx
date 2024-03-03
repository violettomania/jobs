import Wrapper from '../assets/wrappers/StatItem';

interface StatItemProps {
  count: number;
  title: string;
  icon: JSX.Element;
  color: string;
  bcg: string;
}

const JobStatItem = ({ count, title, icon, color, bcg }: StatItemProps) => {
  return (
    <Wrapper color={color} $bcg={bcg}>
      <header>
        <span className='count'>{count}</span>
        <span className='icon'>{icon}</span>
      </header>
      <h5 className='title'>{title}</h5>
    </Wrapper>
  );
};

export default JobStatItem;
