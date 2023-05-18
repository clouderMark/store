import {
  SolutionInfoImage as SolutionInfoImageMapping,
} from '../mapping.js';
import FileService from '../../services/File.js';

const saveInfoImages = async (newImages, newImageUniques, relatedTo) => {
  if (Array.isArray(newImages)) {
    for (let i = 0; i < newImages.length; i++) {
      const el = newImages[i];
      const unique = newImageUniques[i];
      const image = FileService.save(el);

      await SolutionInfoImageMapping.create({
        image,
        unique,
        solutionId: relatedTo,
      });
    }
  } else if (newImages) {
      const el = newImages;
      const unique = newImageUniques;
      const image = FileService.save(el);

      await SolutionInfoImageMapping.create({
        image,
        unique,
        solutionId: relatedTo,
      });
  }
}

export default saveInfoImages;
