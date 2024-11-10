// import { Request, Response } from 'express';
// import { getMonthlyOverview } from '../services/birthdayRequestService';

// export async function fetchMonthlyOverview(req: Request, res: Response) {
//   try {
//     const startDate = new Date('2024-01-01');
//     const endDate = new Date('2024-01-31');

//     const monthlyData = await getMonthlyOverview(startDate, endDate);
//     res.json(monthlyData);
//   } catch (error) {
//     console.error('Error fetching monthly overview:', error);
//     res.status(500).json({ message: 'Error fetching monthly overview' });
//   }
// }

// import { Request, Response } from 'express';
// import { getMonthlyOverview } from '../services/birthdayRequestService';

// export async function fetchMonthlyOverview(req: Request, res: Response) {
//   try {
//     console.log('fetchMonthlyOverview called'); // Add a debug log to verify this function is called
//     const startDate = new Date('2024-01-01');
//     const endDate = new Date('2024-01-31');

//     const monthlyData = await getMonthlyOverview(startDate, endDate);
//     res.json(monthlyData);
//   } catch (error) {
//     console.error('Error fetching monthly overview:', error);
//     res.status(500).json({ message: 'Error fetching monthly overview' });
//   }
// }


import { Request, Response } from 'express';
import { getMonthlyOverview } from '../services/birthdayRequestService';

export async function fetchMonthlyOverview(req: Request, res: Response) {
  try {
    console.log('fetchMonthlyOverview called'); // Debug log
    const monthlyData = await getMonthlyOverview();
    console.log('Data returned from getMonthlyOverview:', monthlyData); // Log the result
    res.json(monthlyData);
  } catch (error) {
    console.error('Error fetching monthly overview:', error);
    res.status(500).json({ message: 'Error fetching monthly overview' });
  }
}
