import {IconButton} from '@mui/joy';
import ClearIcon from '@mui/icons-material/Clear';
import NotStartedIcon from '@mui/icons-material/NotStarted';

import {useTelegram} from '../../common/customHook';

import s from './Header.module.css';

export const Header = () => {

  const {onCloseTMA, userTG, onToggleButton} = useTelegram();

  return (
    <div className={s.headerContainer}>
      <span>
        {userTG?.username ? userTG?.username : 'Пользователь'}
        <h1>
          {userTG?.username}
        </h1>
      </span>
      <IconButton
        color="primary"
        aria-label="Открыть интерфейс">
        <NotStartedIcon onClick={onToggleButton}/>
      </IconButton>
      <IconButton
        color="primary"
        aria-label="Закрыть">
        <ClearIcon onClick={onCloseTMA}/>
      </IconButton>
    </div>
  );
};
