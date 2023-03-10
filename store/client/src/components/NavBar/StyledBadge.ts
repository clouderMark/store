import {Badge, BadgeProps} from '@mui/material';
import {styled} from '@mui/material/styles';

export const StyledBadge = styled(Badge)<BadgeProps>(({theme}) => ({
  '& .MuiBadge-badge': {
    right: -1,
    top: 4,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));
