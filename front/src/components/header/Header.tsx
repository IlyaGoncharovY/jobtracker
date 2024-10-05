import {Button} from '@mui/joy';


export const Header = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const tg = window.Telegram.WebApp;


  const onClose = () => {
    tg.close();
  };

  return (
    <div>
      <Button onClick={onClose}>Закрыть</Button>
      <span>
        {tg.initDataUnsafe?.user?.username}
      </span>
    </div>
  );
};
