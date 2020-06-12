export const selectStudents = state => state.students;
export const selectMemberships = state => state.memberships;
export const selectSubscriptions = state => state.subscriptions;
export const selectTickets = state => state.tickets;
export const selectReservations = state => state.reservations;
export const selectPayments = state => state.payments;

export const selectStudentFilter = state => state.filter.studentName;
export const selectMembershipsFilter = state => state.filter.studentMembership;
export const selectShowAddStudentModal = state => state.show.addStudentModal;
export const selectShowEditStudentModalBundle = state => {
  const { editStudentModal, referenceKey, noteReferenceKey } = state.show;
  return {
    editStudentModal,
    referenceKey,
    noteReferenceKey,
  };
};
export const selectShowStudentRemove = state => state.show.studentRemoveButton;

export const findStudent = (state, id) =>
  state.students.find(student => student.id === id) || {};
export const findMembership = (state, id) =>
  state.memberships.find(mbshp => mbshp.uid === id) || {};
export const findSubscription = (state, id) =>
  state.subscriptions.find(subs => subs.uid === id) || {};
export const filterTickets = (state, id) =>
  state.tickets.filter(ticket => ticket.uid === id) || [];
export const filterReservations = (state, id) =>
  state.reservations.filter(rsvn => rsvn.uid === id) || [];
export const filterPayments = (state, id) =>
  state.payments.filter(payment => payment.uid === id) || [];
