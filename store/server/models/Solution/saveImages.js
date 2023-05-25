import {
  SolutionInfoImage as SolutionInfoImageMapping,
} from '../mapping.js';
import FileService from '../../services/File.js';

const saveInfoImages = async (newImages, relatedToTitles, relatedToSoluion) => {
  if (Array.isArray(newImages)) {
    for (let i = 0; i < newImages.length; i++) {
      const el = newImages[i];
      const relatedTo = relatedToTitles[i];
      const image = FileService.save(el);

      await SolutionInfoImageMapping.create({
        image,
        relatedTo,
        solutionId: relatedToSoluion,
      });
    }
  } else if (newImages) {
      const el = newImages;
      const relatedTo = relatedToTitles;
      const image = FileService.save(el);

      await SolutionInfoImageMapping.create({
        image,
        relatedTo,
        solutionId: relatedToSoluion,
      });
  }
}

export default saveInfoImages;
