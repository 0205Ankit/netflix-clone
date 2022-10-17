import { Section, Div, Image, Box } from '../../styles/browseStyle/listStyle';
import Swipe from '../../helper/swiper';
import { SwiperSlide } from 'swiper/react';
import { IMG_PATH } from '../../constants/apiConstants';
import { Headings, Flex, Rating, Adult, NonAdult } from '../../styles/globalStyles';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useState, useEffect } from 'react';
import { ContentHover,HoverImage,Title,PlayIcon,DownArrow } from '../../styles/browseStyle/listStyle';
import Trailer from '../../helper/trailerButton';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router';
import  Buttons from '../../helper/buttons';


const List = ({ getQuery, topic, type }) => {
  const [imageWidth, setImageWidth] = useState(210);

  const {inView,ref} = useInView({
    delay:100,
    triggerOnce:true,
    threshold:0.2,
  })
  const { data, isLoading } = getQuery(undefined, {
    skip: !inView,
  });
  const [results, setResults] = useState([]);
  const [display, setDisplay] = useState(false);
  const [hoverData, setHoverData] = useState({});
  const [index, setIndex] = useState();
  const navigate=useNavigate()


  useEffect(() => {
    if (data) {
     const changeWidth = window.innerWidth > 1400 ? 210 : 195;
      setImageWidth(changeWidth);
      const myData = [...data.results];
      function shuffle(array) {
        let currentIndex = array.length,
          randomIndex;

        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
          ];
        }
        const arr = array.filter((e) => {
          return e.backdrop_path ? e : '';
        });

        if (arr.length > 18) {
          return arr.slice(0, 18);
        } else {
          return arr;
        }
      }
      setResults(shuffle(myData));
    }
  }, [data]);
  return (
    <div ref={ref}>
      {!isLoading && data ? (
        <>
          <Div>
            <Headings color="white" padding="0 0 1rem 0" weight="600">
              {topic}
            </Headings>
          </Div>
          <Section>
            <Swipe
              spaceBetween={10}
              slidesPerGroup={6}
              slidesPerView={6}
              loopFillGroupWithBlank={false}
              loop={true}
              navigation={true}
            >
              {results.map((e, i) => {
                return (
                  <SwiperSlide key={i}>
                    <Image
                    style={{maxWidth:`${imageWidth}px`}}
                      src={`${IMG_PATH}/${e.backdrop_path}`}
                      onClick={() => {
                          if (i <= 5) {setIndex(i);}
                          if (i <= 11 && i > 5) {setIndex(i - 6);}
                          if (i <= 17 && i > 11) {setIndex(i - 12);}
                          setHoverData(e);
                          setDisplay(true);
                      }}

                    />
                  </SwiperSlide>
                );
              })}
            </Swipe>

            {display &&  (
              <ContentHover
                left={index}
                onMouseLeave={() => {
                  setDisplay(false);
                }}
              >
                <Trailer id={hoverData.id}>
                  <HoverImage src={`${IMG_PATH}/${hoverData.backdrop_path}`} />
                </Trailer>
                <div>
                  <Title>{hoverData.title || hoverData.name}</Title>
                  <Flex spaceBetween padding="1rem 1rem">
                    <Flex gap="0.5rem" >
                      <Trailer id={hoverData.id}>
                        <PlayIcon />
                      </Trailer>
                      <Buttons item={hoverData} type={`${type}Id`}/>
                    </Flex>
                    <DownArrow onClick={()=>{navigate({search:`?q=&${type}Id=${hoverData.id}`})}} />
                  </Flex>
                  <Flex gap="1rem" padding="0 1rem 1rem 1rem" alignCenter>
                    <Rating>{`Rating ${hoverData.vote_average.toFixed(1)}`}</Rating>
                    {false ? <Adult>A</Adult> : <NonAdult>U/A 16+</NonAdult>}
                  </Flex>
                </div>
              </ContentHover>
            )}
          </Section>
        </>
      ) : (
        <Box>
          <SkeletonTheme baseColor="#222" highlightColor="#333">
            <Skeleton
              count={6}
              height={110}
              width={195}
              style={{ marginRight: '8px' }}
              inline={true}
            />
          </SkeletonTheme>
        </Box>
      )}
    </div>
  );
};
export default List;