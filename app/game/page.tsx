import dynamic from 'next/dynamic';
import '../../app/globals.scss';

const StaticMap = dynamic(
  () => import('../../components/Map/StaticMap.component').then((mod) => mod.StaticMap),
  { ssr: false }
);

export default function Game() {

  return <>
    <StaticMap pickedCountries={["США", "Канада"]} />
  </>
}
