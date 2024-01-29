import cn from 'classnames';
import { TriangleArrowDown } from '../icons/triangle-arrow-down';
import { TriangleArrowUp } from '../icons/triangle-arrow-up';
import classNames from 'classnames';



const TitleWithSort = ({
  title,
  ascending,
  isActive = true,
  className,
}) => {
  return (
    <span className={classNames('inline-flex items-center', className)}>
      <span title={`Sort by ${title}`}>{title}</span>&nbsp; &nbsp;

      {ascending ? (
        <TriangleArrowUp
          width="9"
          className={cn('flex-shrink-0 text-gray-500 ms-1.5', {
            '!text-heading': isActive,
          })}
        />
      ) : (
        <TriangleArrowDown
          width="9"
          className={cn('flex-shrink-0 text-gray-500 ms-1.5', {
            '!text-heading': isActive,
          })}
        />
      )}
    </span>
  );
};

export default TitleWithSort;
