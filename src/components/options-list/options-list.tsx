import { useEffect, useState, MouseEvent } from 'react';
import { OptionsTypes } from '../../const';

type OptionsListProps = {
  changeOption: (newType: OptionsTypes) => void;
  currentOption: OptionsTypes;
}


export default function OptionsList({currentOption, changeOption}: OptionsListProps): JSX.Element {

  const [isOptionsShown, setOptionsShown] = useState<boolean>(false);


  const onClick = (e: MouseEvent<HTMLElement>) => {
    const option = e.currentTarget.dataset.option as OptionsTypes;
    changeOption(option);
    setOptionsShown(false);

  };

  useEffect(() => {
    const onDocumentClick = (e: Event) => {
      const target = e.target as HTMLLIElement;
      if(!target.closest('.places__sorting')) {
        setOptionsShown(false);
      }
    };

    document.addEventListener('click', onDocumentClick);
    return () => document.removeEventListener('click', onDocumentClick);


  }, [currentOption]);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by   </span>
      <span onClick={() => {
        setOptionsShown((state) => !state);

      }} className="places__sorting-type" tabIndex={0}
      >
                   Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      {isOptionsShown &&
      <ul className="places__options places__options--custom" style={{display: 'block'}}>
        <li className={`places__option ${currentOption === OptionsTypes.POP ? 'places__option--active' : ''}`} onClick={onClick} data-option={OptionsTypes.POP} tabIndex={0}>Popular
        </li>
        <li className={`places__option ${currentOption === OptionsTypes.ASC ? 'places__option--active' : ''}`} onClick={onClick} data-option={OptionsTypes.ASC} tabIndex={0}>Price: low to high
        </li>
        <li className={`places__option ${currentOption === OptionsTypes.DSC ? 'places__option--active' : ''}`} onClick={onClick} data-option={OptionsTypes.DSC} tabIndex={0}>Price: high to low
        </li>
        <li className={`places__option ${currentOption === OptionsTypes.TOP ? 'places__option--active' : ''}`} onClick={onClick} data-option={OptionsTypes.TOP} tabIndex={0}>Top rated first
        </li>
      </ul>}

    </form>
  );
}
