import {
  CoinBox,
  InfoBox,
  InfoWrapper,
  Name,
  Info,
  CoinDescription,
  BtnWrapper,
  NestedBtn,
  ChartBox
} from "../../styles/Pages/coinPage";
import { ICoin, IOutletProps } from "../../interfaces/type";
import { Loader, LoadText } from "../../styles/Global/globalLayout";
import { Link, Outlet, useOutletContext, useMatch } from "react-router-dom";
import { useQuery } from "react-query";
import { chartFetcher } from "../../api";
import { IChartInfoType } from "../../interfaces/type";
import Seo from "../common/Seo";

function Coin({ coininfo, load, coinId }: ICoin) {
  const priceMatch = useMatch('/:coinId/price');
  const chartMatch = useMatch('/:coinId/chart');
  const { isLoading: chartLoad, data: chartData } = useQuery<IChartInfoType[]>(['chart', coinId], () => chartFetcher(coinId!))
  return (
    <>
      <Seo match={coininfo?.name as string} />
      <CoinBox>
        <Name>{coininfo?.name}</Name>
        {
          !load
            ? <Loader><LoadText>Loading...</LoadText></Loader>
            : (
              <>
                <InfoWrapper>
                  <InfoBox>
                    <Info>Rank :</Info>
                    <Info>{coininfo?.rank}</Info>
                  </InfoBox>
                  <InfoBox>
                    <Info>Symbol :</Info>
                    <Info>{coininfo?.symbol}</Info>
                  </InfoBox>
                  <InfoBox>
                    <Info>Type :</Info>
                    <Info>{coininfo?.type}</Info>
                  </InfoBox>
                </InfoWrapper>
                <CoinDescription>
                  {
                    coininfo!.description.length > 200
                      ? `${coininfo?.description.slice(0, 200)}...`
                      : coininfo?.description
                  }
                </CoinDescription>
                <InfoWrapper>
                  <InfoBox>
                    <Info>Active :</Info>
                    <Info>{String(coininfo?.is_active)}</Info>
                  </InfoBox>
                  <InfoBox>
                    <Info>Hash :</Info>
                    <Info>
                      {
                        coininfo!.hash_algorithm.length > 10
                          ? `${coininfo?.hash_algorithm.slice(0, 10)}...`
                          : coininfo?.hash_algorithm
                      }
                    </Info>
                  </InfoBox>
                </InfoWrapper>
                <BtnWrapper>
                  <Link to={`/${coinId}/price`}>
                    <NestedBtn isActive={priceMatch !== null}>{/*isActive props가 true인지 false인지 체크해주는 과정*/}
                      Price
                    </NestedBtn>
                  </Link>
                  <Link to={`/${coinId}/chart`}>
                    <NestedBtn isActive={chartMatch !== null}>{/*isActive props가 true인지 false인지 체크해주는 과정*/}
                      Chart
                    </NestedBtn>
                  </Link>
                </BtnWrapper>
                <ChartBox>
                  <Outlet context={{ chartLoad, chartData }} />
                </ChartBox>
              </>
            )
        }
      </CoinBox>
    </>
  )
}
export function useProps() {
  return useOutletContext<IOutletProps>();//outlet으로 전송해준 props를 쓸수 있게 만듬.
}
export default Coin;