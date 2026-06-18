-- CreateIndex
CREATE INDEX "ExerciseSplit_userId_idx" ON "ExerciseSplit"("userId");

-- CreateIndex
CREATE INDEX "ExerciseSplitDay_exerciseSplitId_idx" ON "ExerciseSplitDay"("exerciseSplitId");

-- CreateIndex
CREATE INDEX "ExerciseTemplate_exerciseSplitDayId_idx" ON "ExerciseTemplate"("exerciseSplitDayId");

-- CreateIndex
CREATE INDEX "Mesocycle_userId_idx" ON "Mesocycle"("userId");

-- CreateIndex
CREATE INDEX "Mesocycle_exerciseSplitId_idx" ON "Mesocycle"("exerciseSplitId");

-- CreateIndex
CREATE INDEX "MesocycleCyclicSetChange_mesocycleId_idx" ON "MesocycleCyclicSetChange"("mesocycleId");

-- CreateIndex
CREATE INDEX "MesocycleExerciseSplitDay_mesocycleId_idx" ON "MesocycleExerciseSplitDay"("mesocycleId");

-- CreateIndex
CREATE INDEX "MesocycleExerciseTemplate_mesocycleExerciseSplitDayId_idx" ON "MesocycleExerciseTemplate"("mesocycleExerciseSplitDayId");

-- CreateIndex
CREATE INDEX "Workout_userId_startedAt_idx" ON "Workout"("userId", "startedAt");

-- CreateIndex
CREATE INDEX "WorkoutExercise_workoutId_idx" ON "WorkoutExercise"("workoutId");

-- CreateIndex
CREATE INDEX "WorkoutExerciseMiniSet_workoutExerciseSetId_idx" ON "WorkoutExerciseMiniSet"("workoutExerciseSetId");

-- CreateIndex
CREATE INDEX "WorkoutExerciseSet_workoutExerciseId_idx" ON "WorkoutExerciseSet"("workoutExerciseId");

-- CreateIndex
CREATE INDEX "WorkoutOfMesocycle_mesocycleId_idx" ON "WorkoutOfMesocycle"("mesocycleId");
