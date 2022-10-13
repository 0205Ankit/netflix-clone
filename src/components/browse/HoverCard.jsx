import { ContentHover, HoverImage, PlayIcon, DownArrow, Title } from "../../styles/browseStyle/listStyle";
import { Flex, Rating, Adult, NonAdult } from "../../styles/globalStyles";
import Trailer from "../../helper/trailerButton";
import { IMG_PATH } from "../../constants/apiConstants";
import { useNavigate } from "react-router";
import Buttons from "../../helper/buttons";

const HoverCard = ({ data, param, type }) => {
    const navigate = useNavigate()

    return <>
        {data && <ContentHover
            transform={'translateX(-17%)'}
            >
            
            <Trailer id={data.id}>
                <HoverImage
                    src={`${IMG_PATH}/${data.backdrop_path}`}
                />
            </Trailer>
            <div>
                <Title>{data.title || data.name}</Title>
                <Flex spaceBetween padding="1rem 1rem">
                    <Flex gap="0.5rem">
                        <Trailer id={data.id}>
                            <PlayIcon />
                        </Trailer>
                        <Buttons type={type} item={data} />
                    </Flex>
                    <DownArrow
                        onClick={() => {
                            navigate({
                                search: `?q=${param}&${type}=${data.id}`
                            })
                        }}
                    />
                </Flex>
                <Flex gap="1rem" padding="0 1rem 1rem 1rem" alignCenter>
                    <Rating>{`Rating ${data.vote_average.toFixed(1)}`}</Rating>
                    {false ? (
                        <Adult>A</Adult>
                    ) : (
                        <NonAdult>U/A 16+</NonAdult>
                    )}
                </Flex>
            </div>
        </ContentHover>}
    </>

}

export default HoverCard
