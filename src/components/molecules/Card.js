import cx from 'classnames';
import Button from './Button';

export default function Card({
  className,
  title,
  description,
  icon,
  link,
  linkText,
}) {
  const componentClassName = cx('c-card', className, {});

  return (
    <div className={componentClassName}>
      <div className="c-card__icon">{icon}</div>
      <h2 className="c-card__title">{title}</h2>
      <Button text={linkText} link={link} />
      <p className="c-card__description">{description}</p>
    </div>
  );
}
