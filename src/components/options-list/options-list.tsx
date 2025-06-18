import { useEffect, useState, MouseEvent, useRef } from 'react';
import { OptionsTypes } from '../../const';

type OptionsListProps = {
  changeOption: (newType: OptionsTypes) => void;
  currentOption: OptionsTypes;
}


export default function OptionsList({currentOption, changeOption}: OptionsListProps): JSX.Element {

  const [isOptionsShown, setOptionsShown] = useState<boolean>(false);
  const optionsElements = useRef<HTMLLIElement[]>([]);

  const setRef = (el: HTMLLIElement, index: number) => {
    optionsElements.current[index] = el;
  };


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

    optionsElements.current.forEach((el: HTMLLIElement) => {
      el?.classList.remove('places__option--active');
    });
    document.addEventListener('click', onDocumentClick);
    const activeElem = document.querySelector(`li[data-option="${currentOption}"]`);
    if (activeElem) {
      activeElem.classList.add('places__option--active');
    }

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
        <li className="places__option" onClick={onClick} ref={(el) => setRef(el as HTMLLIElement, 0)}
          data-option={OptionsTypes.POP} tabIndex={0}
        >Popular
        </li>
        <li className="places__option" onClick={onClick} ref={(el) => setRef(el as HTMLLIElement, 1)} data-option={OptionsTypes.ASC} tabIndex={0}>Price: low to high
        </li>
        <li className="places__option" onClick={onClick} ref={(el) => setRef(el as HTMLLIElement, 2)} data-option={OptionsTypes.DSC} tabIndex={0}>Price: high to low
        </li>
        <li className="places__option" onClick={onClick} ref={(el) => setRef(el as HTMLLIElement, 3)} data-option={OptionsTypes.TOP} tabIndex={0}>Top rated first
        </li>
      </ul>}

    </form>
  );
}
