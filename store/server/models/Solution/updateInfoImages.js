import { SolutionInfoImage as SolutionInfoImageMapping } from '../mapping.js';
import FileService from '../../services/File.js';
import saveInfoImages from './saveImages.js';

const updateInfoImages = async (
  newInfoImages,
  infoImageUrls,
  images,
  infoImagesRelatedTo,
  solutionId
) => {
  if (newInfoImages && !infoImageUrls) {
    images.map((el) => FileService.delete(el.image));
    await SolutionInfoImageMapping.destroy({
      where: { solutionId: solutionId },
    });
  } else {
    let themNeedDelete;
    if (Array.isArray(infoImageUrls)) {
      themNeedDelete = images.filter(
        (el) => -1 == infoImageUrls.indexOf(el.image)
      );
    } else {
      themNeedDelete = images.filter((el) => infoImageUrls !== el.image);
    }
    themNeedDelete.map(async (el) => {
      FileService.delete(el.image);
      await SolutionInfoImageMapping.destroy({ where: { image: el.image } });
    });
  }

  saveInfoImages(newInfoImages, infoImagesRelatedTo, solutionId);
};

export default updateInfoImages;
