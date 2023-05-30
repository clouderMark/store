import {useState} from 'react';
import {FormControl, InputLabel, Select, MenuItem, SelectChangeEvent} from '@mui/material';
import {deleteSubIndustry, createSubIndustry, fetchSubIndustry, updateSubIndustry} from '../../http/catalogAPI';
import {useAppContext} from '../../components/AppContext';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import {AdminTable} from '../../components/AdminTable/AdminTable';
import {areaRelatedCells} from '../../components/TableCells/cells';
import EditIndustry from '../../components/EditIndustry/EditIndustry';
import AlertLine from '../../components/AlertLine/AlertLine';

const AdminSubIndustries = () => {
  const {catalog} = useAppContext();
  const [show, setShow] = useState(false);
  const [change, setChange] = useState(false);
  const [industryId, setIndustryId] = useState<null | number>(null);
  const [parentName, setParentName] = useState('');
  const [alertOnDelete, setAlertOnDelete] = useState<false | string>(false);

  const handleCreateClick = () => {
    setShow(true);
  };

  const handleUpdateClick = (id: number) => {
    setIndustryId(id);
    setShow(true);
  };

  const handleDeleteClick = (id: number) => {
    deleteSubIndustry(id)
      .then((data) => {
        setChange(!change);
        setAlertOnDelete(`Подиндустрия "${data.name}"удалена`);
        setTimeout(() => {
          setAlertOnDelete(false);
        }, 5000);
        catalog.subIndustries = catalog.subIndustries.filter((el) => el.id !== data.id);
      })
      .catch((error) => console.error(error));
  };

  const handleInputChange = (event: SelectChangeEvent<string>) => {
    setParentName(event.target.value);
  };

  const SelectComponent = (
    <>
      <FormControl sx={{width: '100%', mt: 1, mb: 1}}>
        <InputLabel id="industry-select-label">Подиндустрия</InputLabel>
        <Select
          labelId="industry-select-label"
          name="industry"
          value={parentName}
          onChange={(e) => handleInputChange(e)}
        >
          {!catalog.industriesFetching &&
            catalog.industries.map((item) => (
              <MenuItem key={item.id} value={`${item.id}`}>
                {item.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );

  return (
    <>
      <Breadcrumbs />
      <AdminTable
        title={'subindustry'}
        headCells={areaRelatedCells}
        children={[
          <EditIndustry
            popUpTitle="подиндустрии"
            id={industryId}
            setId={setIndustryId}
            show={show}
            setShow={setShow}
            setChange={setChange}
            fetch={fetchSubIndustry}
            create={createSubIndustry}
            updata={updateSubIndustry}
            child={{component: SelectComponent, value: parentName, setValue: setParentName}}
            key="1"
          />,
        ]}
        handleCreateClick={handleCreateClick}
        handleUpdateClick={handleUpdateClick}
        handleDeleteClick={handleDeleteClick}
        items={catalog.subIndustries}
      />
      {alertOnDelete ? <AlertLine content={alertOnDelete} success={Boolean(alertOnDelete)} /> : null}
    </>
  );
};

export default AdminSubIndustries;
