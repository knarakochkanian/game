import dynamic from 'next/dynamic';
import '../../app/globals.scss';
import { MapType } from '../../components/Map/map.types';

const StaticMap = dynamic(
  () => import('../../components/Map/StaticMap.component').then((mod) => mod.StaticMap),
  { ssr: false }
);

const WorldMap = dynamic(
  () => import('../../components/Map/InteractiveMap.component').then((mod) => mod.WorldMap),
  { ssr: false }
);

export default function Game() {

  return (
  <div
  style={{
    width: '1048px !important',
    height: '542px !important',
  }}
>
  <StaticMap pickedCountries={['США', 'Канада']} />
  {/* <WorldMap mapType={MapType.plane} /> */}
</div>
  )
}
