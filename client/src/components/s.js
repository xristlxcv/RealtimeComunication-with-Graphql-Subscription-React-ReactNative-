// displayAuthors = () => {
//     var data = this.props.getAuthorsQuery;
//     console.log(data);
//     if (data.loading) {
//       return <option disabled>loading authors...</option>;
//     } else {
//       return data.authors.map(author => {
//         return (
//           <option key={author.id} value={author.id}>
//             {author.name}
//           </option>
//         );
//       });
//     }
//   };

//   <Query query={GET_AUTHORS}>
//           {({ loading, data }) => {
//             if (loading) return <options>"loading authors..."</option>;
//             const { authors } = data;
//             return books.map(author => (
//               <option key={author.id} value={author.id}              >
//                 {author.name}
//               </option>
//             ));
//           }}
//         </Query>
//         <BookDetails bookid={this.state.selected} />
//       </div>
