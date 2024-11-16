import {FC, memo, ReactNode} from 'react';

import { motion } from 'framer-motion';

import s from './FormWrapper.module.css';

interface IFormWrapper {
    initialX: string,
    exitX: string,
    children: ReactNode
}

/**
 * Обёртка для форм, с использованием анимации горизонтального скролла.
 * @param {IFormWrapper} props - props для FormWrapper
 * @param {string} props.initialX - Начальная позиция по оси X (в процентах).
 * @param {string} props.exitX - Конечная позиция по оси X (в процентах) при выходе.
 * @param {ReactNode} props.children - Дочерние элементы, которые будут обёрнуты этим компонентом.
 *
 * @example
 * <FormWrapper initialX="-100%" exitX="100%">
 *   <MyForm />
 * </FormWrapper>
 */
export const FormWrapper: FC<IFormWrapper> = memo(({
  initialX,
  exitX,
  children,
}: IFormWrapper) => {
  return (
    <motion.div
      initial={{x: initialX, opacity: 0}}
      animate={{x: 0, opacity: 1}}
      exit={{x: exitX, opacity: 0}}
      transition={{duration: 0.5}}
      className={s.formWrapperContainer}
    >
      {children}
    </motion.div>
  );
});
