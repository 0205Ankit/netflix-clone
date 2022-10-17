import { useEffect, useState } from 'react';
import { activeProfile } from '../services/firebase';
import {
  Image,
  SearchContainer,
  NotFoundContainer,
} from '../styles/browseStyle/listStyle';
import useAutoId from '../hooks/autoIdHook';
import { useSearchParams, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import { IMG_PATH } from '../constants/apiConstants';
import HoverCard from '../components/browse/HoverCard';
import { Headings, Wrapper } from '../styles/globalStyles';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const MyList = () => {
  const userid = useAutoId();
  const [data, setData] = useState(null);
  const [params] = useSearchParams();
  const [display, setDisplay] = useState('relative');
  const location = useLocation();
  useEffect(() => {
    const getListData = async () => {
      const profId = JSON.parse(localStorage.getItem('user-profile')).profileId;
      const currProfile = await activeProfile(userid, profId);
      setData(currProfile.myList);

      if (location.search === '') {
        setDisplay('relative');
      } else {
        setDisplay('fixed');
      }
    };
    if (userid) {
      getListData();
    }
  }, [userid, data, location]);

  return (
    <>
      {data && userid ? (
        <>
          {data.length > 0 ? (
            <div style={{ width: '100%', position: `${display}`}}>
              <Wrapper>
                <Headings
                  size={'2rem'}
                  weight="400"
                  color="white"
                  padding="6rem 0 0 0"
                >
                  My List
                </Headings>
                <SearchContainer>
                  {data.map((item, i) => {
                    return (
                      <Card
                        data={item}
                        type={item.type}
                        param={params.get('q')}
                        key={i}
                      ></Card>
                    );
                  })}
                </SearchContainer>
                <Footer bgColor={'#141414'} />
              </Wrapper>
            </div>
          ) : (
            <NotFoundContainer>
              You haven't added any titles to your list yet .
            </NotFoundContainer>
          )}
        </>
      ) : (
        <Wrapper>
          <div style={{ marginTop: '8rem' }}>
            <SkeletonTheme baseColor="#222" highlightColor="#333">
              <Skeleton
                count={6}
                height={110}
                width={200}
                style={{ marginRight: '6px' }}
                inline={true}
              />
            </SkeletonTheme>
          </div>
        </Wrapper>
      )}
    </>
  );
};

export default MyList;

const Card = ({ data, param, type }) => {
  const [imgWidth,setImgWidth]=useState()
  const [display, setDisplay] = useState();
  useEffect(() => {
     const changeWidth = window.innerWidth > 1400 ? 210 : 195;
     setImgWidth(changeWidth);
  }, [data]);
  return (
    <>
      <div
        style={{ marginBottom: '3rem', position: 'relative' }}
        key={data.id}
        onClick={() => {
          setDisplay(true);
        }}
        onMouseLeave={() => {
          setDisplay(false);
        }}
      >
        <Image
        style={{maxWidth:`${imgWidth}px`}}
          src={`${IMG_PATH}/${data.backdrop_path}`}
          alt={'contentImage'}
        ></Image>
        {display && <HoverCard type={type} data={data} param={param} />}
      </div>
    </>
  );
};
