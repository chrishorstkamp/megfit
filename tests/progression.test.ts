import { describe, expect, test } from 'vitest';
import { getRIRForWeek, progressiveOverloadMagic } from '../src/lib/utils/workoutUtils';
import { testMesocycle } from './progression-data';

describe('progressiveOverloadMagic', () => {
	test('first cycle: correct RIR, exercise settings unchanged', () => {
		const currentRIR = getRIRForWeek(testMesocycle.RIRProgression, 1);

		for (let i = 0; i < testMesocycle.mesocycleExerciseSplitDays.length; i++) {
			const output = progressiveOverloadMagic(testMesocycle, 1, 100, i);

			output.forEach((exercise) => {
				const lastSetToFailure = exercise.lastSetToFailure ?? testMesocycle.lastSetToFailure;
				exercise.sets.forEach((set, idx) => {
					if (idx === exercise.sets.length - 1 && lastSetToFailure) {
						expect(set.RIR).toEqual(0);
						return;
					}
					expect(set.RIR).toEqual(currentRIR);
				});
			});

			const exercisesWithoutSets = testMesocycle.mesocycleExerciseSplitDays[i].mesocycleSplitDayExercises.map(
				({ id, mesocycleExerciseSplitDayId, sets, ...rest }) => rest
			);
			const outputWithoutSets = output.map(({ sets, ...rest }) => rest);

			expect(outputWithoutSets).toStrictEqual(exercisesWithoutSets);
		}
	});
});
