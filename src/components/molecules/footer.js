import cx from 'classnames';

import { disclaimer } from '/data/universal';

export default function Footer({ className }) {
  const componentClassName = cx('l-footer', className, {});

  return (
    <footer className={componentClassName}>
      <p className="u-font-weight--normal u-text-align--center u-body-copy">
        {disclaimer.lineOne}
        <br />
        {disclaimer.lineTwo}
      </p>
    </footer>
  );
}
