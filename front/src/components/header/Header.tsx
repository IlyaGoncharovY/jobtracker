import {Button} from '@mui/joy';

import {useTelegram} from '../../common/customHook';

export const Header = () => {

  const {tg, onCloseTMA} = useTelegram();

  return (
    <div>
      <Button onClick={onCloseTMA}>Закрыть</Button>
      <span>
        {tg.initDataUnsafe?.user?.username}
      </span>
    </div>
  );
};
