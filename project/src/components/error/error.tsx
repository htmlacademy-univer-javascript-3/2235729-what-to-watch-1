import {ReducerName} from '../../types/reducer-name';
import {useAppSelector} from '../../hooks';
import './error.css';

export default function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector((state) => state[ReducerName.Main].error);
  return (error) ? <div className='error'>{error}</div> : null;
}
