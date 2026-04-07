import { Composition, Folder, Still } from "remotion";
import { CoWorkIntro } from "./CoWorkIntro";
import { CoWorkStory } from "./CoWorkStory";
import { PosterStill } from "./PosterStill";
import { PosterElegant } from "./PosterElegant";
import { PosterBrutalist } from "./PosterBrutalist";
import { MarsReport } from "./MarsReport";

export const RemotionRoot = () => {
  return (
    <>
      <Folder name="Landscape">
        <Composition
          id="CoWorkIntro"
          component={CoWorkIntro}
          durationInFrames={900}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>
      <Folder name="Instagram">
        <Composition
          id="CoWorkStory"
          component={CoWorkStory}
          durationInFrames={600}
          fps={30}
          width={1080}
          height={1920}
        />
        <Folder name="Posters">
          <Still id="PosterNeon" component={PosterStill} width={1080} height={1920} />
          <Still id="PosterElegant" component={PosterElegant} width={1080} height={1920} />
          <Still id="PosterBrutalist" component={PosterBrutalist} width={1080} height={1920} />
        </Folder>
      </Folder>
      <Folder name="Client-Reports">
        <Composition
          id="MarsReport"
          component={MarsReport}
          durationInFrames={1080}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
    </>
  );
};
